
import { authService } from "../../../../../../services/AuthService";

jest.mock("../../services/AuthService");

describe("CountGamePresenter", () => {
    it("should call authService.register when register is called", async () => {
        // Arrange=


        // Act


        // Assert
        expect(authService.register).toHaveBeenCalled();
        // expect(authService.register).toHaveBeenCalledWith(username, password);
    });
});
