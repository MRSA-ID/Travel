import { useAppSelector } from "@/hooks/redux-hooks";
import { formatTimestamp, getAvatarUrl } from "@/utils/helper";
import { Field, Input, Label } from "@headlessui/react";

const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.auth);

  const avatarStyle = {
    backgroundImage: `url(${getAvatarUrl(user?.username as string)})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold leading-7">Profile</h1>
        </div>
        <div className="mt-6 rounded-lg bg-white p-6">
          <div className="mt-3 flex flex-col items-start justify-start gap-6 md:flex-row">
            <div
              className="inline-block h-[150px] w-[150px] rounded-full object-cover md:h-[100px] md:w-[100px]"
              style={avatarStyle}
            />
          </div>
          <div className="w-full">
            <Field className="my-3 flex flex-col gap-3">
              <Label className="text-xl font-medium">Nama</Label>
              <Input
                type="text"
                disabled
                value={user?.username || "-"}
                className="text-lg p-3 rounded-lg bg-neutral-300 cursor-not-allowed"
              />
            </Field>

            <Field className="flex flex-col gap-3">
              <Label className="text-xl font-medium">Email</Label>
              <Input
                type="text"
                disabled
                value={user?.email || "-"}
                className="text-lg p-3 rounded-lg bg-neutral-300 cursor-not-allowed"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <Field className="flex flex-col gap-3">
                <Label className="text-xl font-medium">Dibuat</Label>
                <Input
                  type="text"
                  disabled
                  value={formatTimestamp(user?.createdAt as string) || "-"}
                  className="text-lg p-3 rounded-lg bg-neutral-300 cursor-not-allowed"
                />
              </Field>
              <Field className="flex flex-col gap-3">
                <Label className="text-xl font-medium">Diupdate</Label>
                <Input
                  type="text"
                  disabled
                  value={formatTimestamp(user?.updatedAt as string) || "-"}
                  className="text-lg p-3 rounded-lg bg-neutral-300 cursor-not-allowed"
                />
              </Field>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
