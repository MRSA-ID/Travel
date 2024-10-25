import { useState } from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Checkbox,
  Label,
  Field,
  Input,
} from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [enabled, setEnabled] = useState(true);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      {/* tampilan ketika belum login */}
      <nav className="flex justify-between text-black bg-white px-10 pb-3 pt-5 w-full">
        <h1 className="font-Kanit font-bold italic text-3xl">SANTRA</h1>
        <div className="flex items-center justify-center flex-col">
          <Button className="font-Syne font-medium border bg-white italic border-gray-400 px-5 py-1 hover:bg-black hover:text-white transition-colors duration-300 rounded-xl">
            Login
          </Button>
          <Button className="hidden font-Syne font-medium border bg-white italic border-gray-400 px-5 py-1 hover:bg-black hover:text-white transition-colors duration-300 rounded-xl">
            Dashboard
          </Button>
        </div>
      </nav>

      {/* ini component Hero */}
      <section className="flex justify-center items-center bg-white px-4 py-5">
        {/* content text */}

        <div className="h-[800px] relative w-full rounded-lg overflow-hidden">
          <div className="z-20 text-center relative h-full grid px-1.5 md:grid-cols-2 md:text-start md:pl-4 md:px-0 xl:pl-24 bg-black/25 hover:backdrop-blur-sm duration-300 transition-all">
            <h1 className="font-Syne font-bold self-end text-7xl md:col-span-2 lg:text-9xl text-white tracking-tight !leading-[0.85]">
              Discover the <br />
              World’s Wonders
            </h1>
            <span className="font-Syne font-medium text-3xl text-white">
              Your Guide to Inspiring Travel Adventures <br />
              <span className="text-base text-white">
                - Article Travel Apps-
              </span>
            </span>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 ">
            <img
              src="/image/hero_image.jpg"
              className="w-full h-full object-cover"
              alt="hero_image_full"
            />
          </div>
        </div>
      </section>
      {/* akhir component hero */}

      {/* section ini untuk pembatas menampilkan keseluruhan content dengan login  */}
      <div className="barrier bg-gradient-to-t from-white via-white to-transparent w-full h-[200px] absolute bottom-0 z-30 flex justify-center items-center">
        <Button
          onClick={open}
          className="font-Syne font-medium border bg-black italic border-gray-400 px-5 py-1 hover:bg-white hover:text-black transition-colors duration-300 rounded-xl"
        >
          Log in to Explore More Content
        </Button>

        <Dialog
          open={isOpen}
          as="div"
          className="relative z-[999999] focus:outline-none"
          onClose={close}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/65 backdrop-blur-3xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-full max-w-md relative rounded-xl bg-white/5 p-6  duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-white text-center"
                >
                  Sign In To Your Account
                </DialogTitle>
                <div className="w-full max-w-md px-4">
                  <Field>
                    <Label className="text-sm/6 font-medium text-white">
                      Email
                    </Label>
                    <Input className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white" />
                  </Field>
                  <Field>
                    <Label className="text-sm/6 font-medium text-white">
                      Password
                    </Label>
                    <Input
                      className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white"
                      type={enabled ? "text" : "password"}
                    />
                  </Field>
                  <Field className="flex justify-start items-center gap-2 mt-2">
                    <Checkbox
                      checked={enabled}
                      onChange={setEnabled}
                      className="group block size-4 ring-1 ring-white/15 ring-inset rounded border bg-white/10 data-[checked]:bg-white cursor-pointer"
                    >
                      {/* Checkmark icon */}
                      {/* <svg
												className="stroke-white opacity-0 group-data-[checked]:opacity-100"
												viewBox="0 0 14 14"
												fill="none">
												<path
													d="M3 8L6 11L11 3.5"
													strokeWidth={2}
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg> */}
                      <CheckIcon className="hidden size-4 fill-black group-data-[checked]:block" />
                    </Checkbox>
                    <Label className="text-sm/6 font-medium text-white">
                      Show Password
                    </Label>
                  </Field>
                </div>

                <div className="absolute top-3 right-3">
                  <Button
                    className="group inline-flex items-center gap-2 rounded-md bg-white/10 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-white/50 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    onClick={close}
                  >
                    <XMarkIcon className="size-5 fill-white group-hover:fill-black/75" />
                  </Button>
                </div>
                <p className="mt-2 text-sm/6 text-white/50 cursor-pointer text-center">
                  Don't have an account? Sign up now to unlock all content!
                </p>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>

      {/* <section>
				<Button
					onClick={open}
					className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white">
					Open dialog
				</Button>

				<Dialog
					open={isOpen}
					as="div"
					className="relative z-10 focus:outline-none"
					onClose={close}>
					<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4">
							<DialogPanel
								transition
								className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
								<DialogTitle
									as="h3"
									className="text-base/7 font-medium text-white">
									Payment successful
								</DialogTitle>
								<p className="mt-2 text-sm/6 text-white/50">
									Your payment has been successfully submitted. We’ve sent you
									an email with all of the details of your order.
								</p>
								<div className="mt-4">
									<Button
										className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
										onClick={close}>
										Got it, thanks!
									</Button>
								</div>
							</DialogPanel>
						</div>
					</div>
				</Dialog>
			</section> */}
    </>
  );
}

export default App;
