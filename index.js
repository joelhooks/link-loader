require("dotenv").config();
const axios = require("axios");
const _ = require("lodash");

const testingDiffs = require("./testingJSDiffs");

axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.AUTH_TOKEN}`;

const courseSlugs = _.keys(testingDiffs);

courseSlugs.forEach(courseSlug => {
  const course = testingDiffs[courseSlug];
  const lessonSlugs = _.keys(course);
  lessonSlugs.forEach(async lessonSlug => {
    const result = await axios
      .put(`https://egghead.io/api/v1/lessons/${lessonSlug}`, {
        code_url: course[lessonSlug]
      })
      .then(({ data }) => data.code);
    console.log(result);
  });
});
