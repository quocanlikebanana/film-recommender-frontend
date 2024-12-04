import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../app/firebase';
import { useNavigate } from 'react-router-dom';
import { useGoogleAuthMutation } from '../services/authApi';
import { toErrorMessage } from '../../../error/fetchBaseQuery.error';

export default function GoogleLogin() {
    const navigate = useNavigate();
    const [googleAuth, { isLoading, error }] = useGoogleAuthMutation();

    async function handleGoogleLogin() {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        console.log(userCredential);

        if (userCredential.user) {
            const userToken = await userCredential.user.getIdToken(true);
            await googleAuth({ idToken: userToken });
            navigate('/');
        }
    }

    return (
        <>
            {error && <div className='text-red-600'>{toErrorMessage(error)}</div>}
            <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                className='py-2 my-4 border-red-600 text-red-600'
                onClick={handleGoogleLogin}
            >
                {
                    isLoading ?
                        "Loading..." :
                        "Continue with Google"
                }
            </Button>
        </>
    );
}
