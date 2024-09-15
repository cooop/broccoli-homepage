import { expect, it, describe } from "vitest";
import {
  validateFullName,
  validateEmail,
  validateConfirmEmail,
} from "../src/utils/validator";

describe("validateFullName", () => {
  it("should return true if full name is valid", () => {
    expect(validateFullName("Jan")).toBe(true);
    expect(validateFullName("John Doe")).toBe(true);
  });

  it("should return false if full name is too short", () => {
    expect(validateFullName("J")).toBe(false);
    expect(validateFullName("JD")).toBe(false);
  });

  it("should return false if full name is empty", () => {
    expect(validateFullName("")).toBe(false);
  });
});

describe("validateEmail", () => {
  it("should return true if email is valid", () => {
    expect(validateEmail("example@example.com")).toBe(true);
    expect(validateEmail("user.name+tag+sorting@example.com")).toBe(true);
    expect(validateEmail("user.name@example.co.uk")).toBe(true);
    expect(validateEmail("user-name@example.com")).toBe(true);
    expect(validateEmail("user@subdomain.example.com")).toBe(true);
  });

  it("should return false if email is invalid", () => {
    expect(validateEmail("invalid-email.com")).toBe(false);
    expect(validateEmail("user@invalid.com-")).toBe(false);
    expect(validateEmail("user@invalid.-com")).toBe(false);
    expect(validateEmail("user@invalid_.com")).toBe(false);
    expect(validateEmail("user@invalid.com_")).toBe(false);
    expect(validateEmail("user@invalid.com ")).toBe(false);
    expect(validateEmail("user@invalid.com ")).toBe(false);
    expect(validateEmail("user@invalid.com.")).toBe(false);
    expect(validateEmail("user@invalid.com..")).toBe(false);
    expect(validateEmail("user@invalid.com.-")).toBe(false);
  });

  it("should return false for empty strings", () => {
    expect(validateEmail("")).toBe(false);
  });
});

describe("validateConfirmEmail", () => {
  it("should return true if emails match", () => {
    expect(
      validateConfirmEmail("example@example.com", "example@example.com")
    ).toBe(true);
  });

  it("should return false if emails do not match", () => {
    expect(
      validateConfirmEmail("example@example.com", "example2@example.com")
    ).toBe(false);
    expect(
      validateConfirmEmail("example@example.com", "axample@example.com")
    ).toBe(false);
    expect(
      validateConfirmEmail("example@example.com", "Example@example.com")
    ).toBe(false);
  });
});
