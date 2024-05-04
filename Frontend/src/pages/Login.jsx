import TextField from "@mui/material/TextField";
import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";
import logo_hust from '../assets/image/logo-hust.png'


function Login() {
    // const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    function loginHandling() {
        // const userDetails = {
        //     email,
        //     password,
        // };
        //
    }

    return (
        <div className={"w-full h-[100vh] grid grid-cols-[55%,45%] "}>
            <div className={'flex items-center justify-center flex-col'}>
                <img src={logo_hust} alt="" className={'h-[250px]'}/>
                <div className={' mt-10'}>
                    <h1 className={'font-bold text-gray-600 text-[50px]'}><span
                        className={'text-red-600'}>HUST</span> / <span
                        className={'text-blue-600'}>PROJECT</span></h1>
                    <p className={'text-gray-500 -mt-1 text-[40px] italic'}>One love, one future</p>
                </div>
            </div>
            <div className={'flex items-center justify-center flex-col'}>
                <div className={' h-[70%] w-[36vw] shadow-[0px_5px_20px] shadow-gray-300'}>
                    <div className="px-10 pb-5 rounded-md  flex flex-col justify-center items-center">
                        <h1 className="uppercase text-2xl mb-6  font-bold mt-20">Đăng nhập</h1>
                        <TextField
                            label="Email"
                            className="w-full !my-4 !mt-10"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <FormControl variant="outlined" className={"w-full !my-5 !mb-10"}>
                            <InputLabel htmlFor="outlined-adornment-password">
                                Mật khẩu
                            </InputLabel>
                            <OutlinedInput
                                value={password}
                                onChange={handlePasswordChange}
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Mật khẩu"
                            />
                        </FormControl>
                        <Button
                            variant="contained"
                            className={"!my-4"}
                            onClick={loginHandling}
                        >
                            Đăng nhập
                        </Button>
                        <div
                            className={
                                "flex items-center justify-end w-full mb-6 hover:cursor-pointer"
                            }
                        >
                            <div
                                className={"underline text-md font-medium  hover:text-blue-600 mt-6"}
                            >
                                Quên mật khẩu
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
