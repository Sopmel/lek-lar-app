import { loginPresenter } from "./LoginPresenter";
import { authService } from "../../services/AuthService";

jest.mock("../../services/AuthService");

describe("LoginPresenter", () => {
    it("should call authService.login when login is called", async () => {
        // Arrange= 
        authService.login = jest.fn();

        const username = "testuser";
        const password = "testpassword";

        // Act
        await loginPresenter.login(username, password);

        // Assert
        expect(authService.login).toHaveBeenCalled();
        expect(authService.login).toHaveBeenCalledWith(username, password);
    });

    it("should return token when login is successful", async () => {
        // Arrange
        authService.login = jest.fn().mockReturnValue("token");

        const username = "testuser";
        const password = "testpassword";

        // Act
        const result = await loginPresenter.login(username, password);

        // Assert
        expect(result).toBe("token");
    });
});
