import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../app/firebase';
import { useGoogleAuthMutation } from '../services/authApi';
import { toErrorMessage } from '../../../error/fetchBaseQuery.error';

export default function GoogleLogin() {
    const [googleAuth, { isLoading, error }] = useGoogleAuthMutation();

    async function handleGoogleLogin() {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        console.log(userCredential);
        if (userCredential.user) {
            const userToken = await userCredential.user.getIdToken(true);
            await googleAuth({ idToken: userToken });
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


            {/* <script src="https://accounts.google.com/gsi/client" async></script>
            <div id="g_id_onload"
                data-client_id="707777772603-97vd3ekm9ooifubturqmji9vtaf2as54.apps.googleusercontent.com"
                data-login_uri="http://localhost:3000/"
                data-auto_prompt="false">
            </div>
            <div className="g_id_signin"
                data-type="standard"
                data-size="large"
                data-theme="outline"
                data-text="sign_in_with"
                data-shape="rectangular"
                data-logo_alignment="left">
            </div> */}

        </>
    );
}
