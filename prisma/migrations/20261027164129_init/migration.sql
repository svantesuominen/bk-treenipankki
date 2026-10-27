-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "forPlayers" BOOLEAN NOT NULL DEFAULT false,
    "forCoaches" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ExerciseAgeGroup" (
    "exerciseId" TEXT NOT NULL,
    "ageGroup" TEXT NOT NULL,

    PRIMARY KEY ("exerciseId", "ageGroup"),
    CONSTRAINT "ExerciseAgeGroup_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExerciseTheme" (
    "exerciseId" TEXT NOT NULL,
    "theme" TEXT NOT NULL,

    PRIMARY KEY ("exerciseId", "theme"),
    CONSTRAINT "ExerciseTheme_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
