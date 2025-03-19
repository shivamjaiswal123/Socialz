import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  postImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const session = await getServerSession(authOptions)

      // If you throw, the user will not be able to upload
      if (!session) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session?.user.uid };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        console.log("Upload complete for userId: ", metadata.userId);

        console.log("file url: ", file.ufsUrl);

        return { uploadedBy: metadata.userId };
      } catch (error) {
        console.error("Error in onUploadComplete:", error);
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
