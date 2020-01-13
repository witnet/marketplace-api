const rootDir = process.env.NODE_ENV === "development" ?
  "src" :
  "build/src"

module.exports = {
   "type": "mongodb",
   "url": `${process.env.MONGODB_URL}`,
   "synchronize": true,
   "logging": false,
   "entities": [
      rootDir + "/entity/**/*.{ts,js}"
   ],
   "migrations": [
      rootDir + "/migration/**/*.{ts,js}"
   ],
   "subscribers": [
      rootDir + "/subscriber/**/*.{ts,js}"
   ],
   "cli": {
      "entitiesDir": rootDir + "/entity",
      "migrationsDir": rootDir + "/migration",
      "subscribersDir": rootDir + "/subscriber"
   }
}