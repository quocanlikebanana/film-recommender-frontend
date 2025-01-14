import { isRouteErrorResponse } from "react-router-dom";
import ClientError from "./client.error";

export default function resolveErrorMessage(error: unknown): string {
    let errorMessage: string;
    // Errors come from the API
    if (isRouteErrorResponse(error)) {
        // error is type `ErrorResponse`
        if (error.data && error.data.message) {
            errorMessage = error.data.message;
        } else if (error.status === 404) {
            errorMessage = "This page doesn't exist!";
        } else if (error.status === 401) {
            errorMessage = "You aren't authorized to see this!";
        } else if (error.status === 503) {
            errorMessage = "Looks like our API is down.";
        } else if (error.status === 418) {
            errorMessage = "I'm a teapot";
        } else {
            errorMessage = "Internal Server Error";
        }
    } else if (error instanceof ClientError) {
        // Errors come from the client
        errorMessage = error.displayMessage;
    } else if (error instanceof Error) {
        console.error(error);
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else {
        console.error(error);
        errorMessage = 'Unknown error';
    }
    return errorMessage;
}
