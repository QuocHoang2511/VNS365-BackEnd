-- CreateTable
CREATE TABLE "UserLikeStory" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "story_id" INTEGER NOT NULL,

    CONSTRAINT "UserLikeStory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserLikeStory" ADD CONSTRAINT "UserLikeStory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLikeStory" ADD CONSTRAINT "UserLikeStory_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
