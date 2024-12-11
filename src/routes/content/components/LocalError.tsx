import { Alert, Container } from "@mui/material";

interface LocalErrorProps {
    message: string;
}

export default function LocalError({ message }: LocalErrorProps) {
    return (
        <Container sx={{
            width: '100%',
            height: '100%',
            my: 4,
        }}>
            <Container>
                <Alert severity="error">{message}</Alert>
            </Container>
        </Container>
    );
}