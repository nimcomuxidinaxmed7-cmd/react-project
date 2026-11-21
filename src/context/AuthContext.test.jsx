import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { AuthProvider, useAuth } from "./AuthContext";

function TestComponent() {
  const { user, register, login, logout } = useAuth();

  return (
    <div>
      <p>{user ? user.name : "Not logged in"}</p>

      <button onClick={() => register("Alex", "alex@test.com", "password123")}>
        Register
      </button>

      <button onClick={() => login("alex@test.com", "password123")}>
        Login
      </button>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

function renderAuth() {
  return render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );
}

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("registers a new user", () => {
    renderAuth();

    fireEvent.click(screen.getByText("Register"));

    expect(screen.getByText("Alex")).toBeInTheDocument();

    const users = JSON.parse(localStorage.getItem("shopease_users"));
    expect(users).toHaveLength(1);
    expect(users[0].email).toBe("alex@test.com");
  });

  it("logs in an existing user", () => {
    localStorage.setItem(
      "shopease_users",
      JSON.stringify([
        {
          name: "Alex",
          email: "alex@test.com",
          password: "password123",
        },
      ])
    );

    renderAuth();

    fireEvent.click(screen.getByText("Login"));

    expect(screen.getByText("Alex")).toBeInTheDocument();
  });

  it("logs out the user", () => {
    localStorage.setItem(
      "shopease_user",
      JSON.stringify({ name: "Alex", email: "alex@test.com" })
    );

    renderAuth();

    fireEvent.click(screen.getByText("Logout"));

    expect(screen.getByText("Not logged in")).toBeInTheDocument();
    expect(localStorage.getItem("shopease_user")).toBeNull();
  });
});
