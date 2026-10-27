-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "forPlayers" BOOLEAN NOT NULL DEFAULT false,
    "forCoaches" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseAgeGroup" (
    "exerciseId" TEXT NOT NULL,
    "ageGroup" TEXT NOT NULL,

    CONSTRAINT "ExerciseAgeGroup_pkey" PRIMARY KEY ("exerciseId","ageGroup")
);

-- CreateTable
CREATE TABLE "ExerciseTheme" (
    "exerciseId" TEXT NOT NULL,
    "theme" TEXT NOT NULL,

    CONSTRAINT "ExerciseTheme_pkey" PRIMARY KEY ("exerciseId","theme")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "ExerciseAgeGroup" ADD CONSTRAINT "ExerciseAgeGroup_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseTheme" ADD CONSTRAINT "ExerciseTheme_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
