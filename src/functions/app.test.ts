import axios, { AxiosError } from "axios";
import { getMockLogger } from "./utils/getMockLogger";

const logger = getMockLogger();

describe("Handler tests", () => {
  it("should return 200 with a valid pact GET request", async () => {
    // Arrange

    const requestPath = "/v2/pet/123";
    // Act
    const result = await axios
      .get(`http://localhost:8281${requestPath}`, {})
      .then();
    // Assert
    expect(result.status).toEqual(200);
    expect(result.data).toEqual({
      id: 123,
      name: "doggie",
      photoUrls: ["string"],
      status: "available",
      tags: [{ id: 0, name: "string" }],
    });
  });

  it("should return 500 with an invalid pact GET request", async () => {
    // Arrange

    const requestPath = "/v2/pet/doesnt_exist";
    // Act
    try {
      await axios.get(`http://localhost:8281${requestPath}`, {}).then();
    } catch (error) {
      if (error && error.isAxiosError) {
        const axiosError = error as AxiosError;

        if (error.response) {
          // Assert
          expect(axiosError.response.status).toEqual(500);
          expect(axiosError.response.data).toEqual({
            message: "No interaction found for GET /v2/pet/doesnt_exist",
            interaction_diffs: [],
          });
        }
      }
    }
  });
});
