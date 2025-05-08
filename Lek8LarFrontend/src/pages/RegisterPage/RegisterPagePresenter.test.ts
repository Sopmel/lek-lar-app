import { registerPresenter } from "./RegisterPresenter";
import { authService } from "../../services/AuthService";

jest.mock("../../services/AuthService");

describe("RegisterPresenter", () => {
    it("should call authService.register when register is called", async () => {
        // Arrange=
        authService.register = jest.fn();

        const username = "testuser";
        const password = "testpassword";

        // Act
        await registerPresenter.register(username, password);

        // Assert
        expect(authService.register).toHaveBeenCalled();
        expect(authService.register).toHaveBeenCalledWith(username, password);
    });
});
