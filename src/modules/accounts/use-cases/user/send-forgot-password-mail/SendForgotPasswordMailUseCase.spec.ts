import { UsersRepositoryInMemory } from "@modules/accounts/infra/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/infra/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/date-provider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/mail-provider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let mailProviderInMemory: MailProviderInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe("Send Forgot Password Mail Use Case", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        mailProviderInMemory = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dayjsDateProvider,
            mailProviderInMemory
        );
    });

    it("Should be able to send a forgot password mail to the user", async () => {
        const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

        const user = await usersRepositoryInMemory.create({
            name: "Jeremiah Haynes",
            password: "12345",
            email: "opu@habnici.gb",
            driver_license: "ABC-123",
        });

        await sendForgotPasswordMailUseCase.execute(user.email);

        expect(sendMail).toHaveBeenCalled();
    });

    it("Should not be able to send an email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("email@error.com")
        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("Should be able to create an users token", async () => {
        const generateTokenMail = jest.spyOn(
            usersTokensRepositoryInMemory,
            "create"
        );

        const user = await usersRepositoryInMemory.create({
            name: "Stanley Lowe",
            password: "12345",
            email: "duzatiga@hilce.er",
            driver_license: "1091198878",
        });

        await sendForgotPasswordMailUseCase.execute(user.email);

        expect(generateTokenMail).toHaveBeenCalled();
    });
});
