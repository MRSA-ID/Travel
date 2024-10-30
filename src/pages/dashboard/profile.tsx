/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useCommentForm from "@/hooks/comments/useForm";
import { useAppSelector } from "@/hooks/redux-hooks";
import { formatTimestamp, getAvatarUrl } from "@/utils/helper";
import { Field, Input, Label } from "@headlessui/react";
import { MapPinIcon } from "@heroicons/react/16/solid";
import { Helmet } from "react-helmet-async";

const ProfilePage = () => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { user } = useAppSelector((state) => state.auth);
  const comments = useCommentForm();
  const avatarStyle = {
    backgroundImage: `url(${getAvatarUrl(user?.username as string)})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  // Effect untuk memuat data awal
  useEffect(() => {
    comments.loadComments();
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, []);

  // Effect untuk memuat ulang data ketika pageSize berubah
  // dan bukan merupakan load pertama
  useEffect(() => {
    if (!isInitialLoad) {
      comments.loadComments();
    }
  }, [comments.pageSize]);

  return (
    <>
      <Helmet>
        <title>Dashboard - Profile | Article App Travel</title>
      </Helmet>
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

        <div className="mt-6 rounded-lg bg-white p-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MapPinIcon className="w-5 h-5 fill-black" />
              Commented Destinations (
              {comments.items &&
                comments.items.filter(
                  (comment) =>
                    comment.article !== null && comment.user?.id === user?.id,
                ).length}
              )
            </h3>

            {!comments.items || comments.items.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                You haven't commented on any destinations yet.
              </div>
            ) : (
              <div className="space-y-6">
                {comments.items &&
                  comments.items
                    .filter(
                      (comment) =>
                        comment.article !== null &&
                        comment.user?.id === user?.id,
                    )
                    .map((comment) => (
                      <div
                        key={comment.id}
                        className="border-b border-gray-200 pb-6 last:border-0"
                      >
                        {comment.article ? (
                          <div className="flex space-x-4">
                            {comment.article.cover_image_url && (
                              <img
                                src={comment.article.cover_image_url}
                                alt={comment.article.title}
                                className="w-24 h-24 object-cover rounded-lg"
                              />
                            )}
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-800 mb-2">
                                {comment.article.title ||
                                  "Untitled Destination"}
                              </h3>
                              <p className="text-gray-600 mb-2">
                                {comment.content}
                              </p>
                              <div className="text-sm text-gray-500">
                                Commented on{" "}
                                {new Date(
                                  comment.createdAt,
                                ).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-gray-600">
                            <p className="mb-2">{comment.content}</p>
                            <div className="text-sm text-gray-500">
                              Commented on{" "}
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
