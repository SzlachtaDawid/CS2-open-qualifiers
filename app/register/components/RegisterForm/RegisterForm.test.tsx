import { afterEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { registerTeam } from "@/app/register/actions";
import { RegisterForm } from "./RegisterForm";
import { ROSTER_SIZE } from "./schema";

vi.mock("@/app/register/actions", () => ({
  registerTeam: vi.fn(),
}));

const registerTeamMock = vi.mocked(registerTeam);

const playerLabel = (index: number) => `Player ${index + 1} · Nickname`;

const fillValidForm = () => {
  fireEvent.change(screen.getByRole("textbox", { name: "Team name" }), { target: { value: "Phoenix Five" } });
  ["s1mple", "ZywOo", "NiKo", "device", "ropz"].forEach((nickname, index) => {
    fireEvent.change(screen.getByRole("textbox", { name: playerLabel(index) }), { target: { value: nickname } });
  });
};

afterEach(() => {
  vi.clearAllMocks();
});

describe("RegisterForm component", () => {
  test("renders the team name field, one field per roster slot and the submit button", () => {
    render(<RegisterForm />);

    expect(screen.getByRole("textbox", { name: "Team name" })).toBeInTheDocument();
    for (let index = 0; index < ROSTER_SIZE; index += 1) {
      expect(screen.getByRole("textbox", { name: playerLabel(index) })).toBeInTheDocument();
    }
    expect(screen.getByRole("button", { name: "Submit roster" })).toBeInTheDocument();
  });

  test.each([
    ["Team name", "Team name"],
    ["a nickname", "Player 1 · Nickname"],
  ])("keeps interior spaces in %s and trims the trailing one on blur", (_, label) => {
    render(<RegisterForm />);

    const field = screen.getByRole("textbox", { name: label });
    fireEvent.change(field, { target: { value: "  Natus   Vincere " } });
    expect(field).toHaveValue("Natus Vincere ");

    fireEvent.blur(field);
    expect(field).toHaveValue("Natus Vincere");
  });

  test("drops a character outside the allowed set as it is typed", () => {
    render(<RegisterForm />);

    const player1 = screen.getByRole("textbox", { name: playerLabel(0) });
    fireEvent.change(player1, { target: { value: "rop<z>" } });

    expect(player1).toHaveValue("ropz");
  });

  test("shows a required error per empty field and does not call registerTeam", async () => {
    render(<RegisterForm />);

    fireEvent.click(screen.getByRole("button", { name: "Submit roster" }));

    expect(await screen.findAllByText("Required")).toHaveLength(ROSTER_SIZE + 1);
    expect(registerTeamMock).not.toHaveBeenCalled();
  });

  test("rejects a roster with two identical nicknames", async () => {
    render(<RegisterForm />);

    fillValidForm();
    fireEvent.change(screen.getByRole("textbox", { name: playerLabel(4) }), { target: { value: "S1MPLE" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit roster" }));

    expect(await screen.findByText("Nicknames must be unique")).toBeInTheDocument();
    expect(registerTeamMock).not.toHaveBeenCalled();
  });

  test("submits valid data", async () => {
    registerTeamMock.mockResolvedValueOnce({ ok: true, teamName: "Phoenix Five" });
    render(<RegisterForm />);

    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: "Submit roster" }));

    await waitFor(() =>
      expect(registerTeamMock).toHaveBeenCalledWith({
        teamName: "Phoenix Five",
        players: [
          { nickname: "s1mple" },
          { nickname: "ZywOo" },
          { nickname: "NiKo" },
          { nickname: "device" },
          { nickname: "ropz" },
        ],
      })
    );

    expect(await screen.findByRole("status")).toHaveTextContent("Roster received");
    expect(screen.getByRole("textbox", { name: "Team name" })).toHaveValue("");
  });

  test("puts a field error from the server action under that field", async () => {
    registerTeamMock.mockResolvedValueOnce({
      fieldErrors: { teamName: "That team name is already taken." },
    });
    render(<RegisterForm />);

    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: "Submit roster" }));

    const teamName = await screen.findByRole("textbox", { name: "Team name" });
    expect(teamName).toHaveAccessibleDescription("That team name is already taken.");
  });

  test("maps a server-side roster error back onto the right player field", async () => {
    registerTeamMock.mockResolvedValueOnce({
      fieldErrors: { "players.2.nickname": "That nickname is banned from the league." },
    });
    render(<RegisterForm />);

    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: "Submit roster" }));

    const player3 = await screen.findByRole("textbox", { name: playerLabel(2) });
    expect(player3).toHaveAccessibleDescription("That nickname is banned from the league.");
  });
});
