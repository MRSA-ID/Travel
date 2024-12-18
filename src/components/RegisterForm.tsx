import { ChangeEvent, useState } from "react";
import { Button, Checkbox, Label, Field, Input } from "@headlessui/react";
import { CheckIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { register } from "@/store/slices/authSlices";
import { Link } from "react-router-dom";

interface RegisFormData {
  username: string;
  email: string;
  password: string;
}

interface ErrorRegisResponse {
  status: number;
  name: string;
  message: string;
  details: ErrorDetailsType | object;
}

type ErrorDetailsType = {
  errors: ErrorDetailType[];
};

type ErrorDetailType = {
  path: string[];
  message: string;
  name: string;
};

const RegisterForm = () => {
  const [enabled, setEnabled] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState<RegisFormData>({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<ErrorRegisResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setError(null);
    try {
      await dispatch(register(formData)).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.error) {
        if (err.error?.status === 400) {
          setError(err.error);
        }
        setError(err.error);
      } else if (err.message) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage(err);
      }
    }
  };

  // Mendapatkan error message untuk field tertentu
  const getFieldError = (fieldName: string) => {
    const errors = (error?.details as ErrorDetailsType)?.errors;
    if (!errors) return "";

    const fieldError = errors.find((err) => err.path[0] === fieldName);
    return fieldError?.message || "";
  };

  return (
    <section>
      <div className="w-full flex justify-center items-center bg-neutral-100 h-screen">
        <div className="w-full max-w-[588px] rounded-lg font-Syne bg-white p-7 text-black">
          <h5 className="mb-1 text-2xl font-semibold ">Selamat Datang!</h5>
          <p className="mb-3 text-base text-black/35">
            Silahkan Buat Akun{" "}
            <span className="italic font-Kanit font-semibold">SANTRA</span> Anda
          </p>
          <div
            id="error"
            className={` ${(error && !Object.keys(error.details).length) || errorMessage !== null ? "" : "hidden"} flex text-red-400 font-semibold items-center capitalize text-sm bg-red-100 p-2 gap-2 rounded-md`}
          >
            <XCircleIcon className="size-4 fill-red-400" />
            <span>
              {error && !Object.keys(error.details).length
                ? error?.message
                : ""}
              {errorMessage}
            </span>
          </div>
          <form className="gap-6" action="">
            <Field>
              <Label className="text-sm/6 font-medium ">Username</Label>
              <span className="text-red-400 font-semibold text-sm pl-1">*</span>
              <span
                id="error"
                className="block text-red-400 font-semibold capitalize text-sm"
              >
                {getFieldError("username")}
              </span>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="nama anda"
                required
                className="mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 "
                value={formData.username}
                onChange={handleChange}
              />
            </Field>
            <Field className="mt-4">
              <Label className="text-sm/6 font-medium ">Alamat Email</Label>
              <span className="text-red-400 font-semibold text-sm pl-1">*</span>
              <span
                id="error"
                className="block text-red-400 font-semibold capitalize text-sm"
              >
                {getFieldError("email")}
              </span>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="nama@gmail.com"
                required
                className="mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 "
                value={formData.email}
                onChange={handleChange}
              />
            </Field>
            <Field className="mt-4">
              <Label className="text-sm/6 font-medium ">Password</Label>
              <span className="text-red-400 font-semibold text-sm pl-1">*</span>
              <span
                id="error"
                className="block text-red-400 font-semibold capitalize text-sm"
              >
                {getFieldError("password")}
              </span>
              <Input
                id="password"
                name="password"
                type={enabled ? "text" : "password"}
                placeholder="********"
                required
                className="mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 "
                value={formData.password}
                onChange={handleChange}
              />
            </Field>
            <Field className="flex justify-start items-center gap-2 mt-2">
              <Checkbox
                checked={enabled}
                onChange={setEnabled}
                className="group block size-4 ring-1 ring-white/15 ring-inset rounded border bg-white/10 data-[checked]:bg-white cursor-pointer"
              >
                <CheckIcon className="hidden size-4 fill-black group-data-[checked]:block" />
              </Checkbox>
              <Label className="text-sm/6 font-medium text-black">
                Show Password
              </Label>
            </Field>
            <Link
              to={"/auth/login"}
              className="mt-5 text-sm/6 w-full inline-block text-black/50 cursor-pointer text-center"
            >
              Already, Have account
            </Link>
            <Button
              // onClick={submit}
              className="font-Syne w-full mt-5 font-medium border bg-white italic border-gray-400 px-5 py-3 hover:bg-black text-xl hover:text-white transition-colors duration-300 rounded-md"
              onClick={handleSubmit}
            >
              {isLoading ? "Sign Up..." : "Sign Up"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
