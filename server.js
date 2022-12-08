"use strict";

const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST;
const fuzzysort = require("fuzzysort");

// App
const app = express();
app.get("/", (req, res) => {
  const searchTerm = req.query.search;
  const result = fuzzysort.go(searchTerm, preparedDataSet);
  res.send(result.map((x) => x.target));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

const dataSet = [
  "Implemented A/B tests modifying the frontend using C# .NET, React that improved user engagement by an average of 20%, and upsell ad conversion rate by an average of 300% in a 50 million user sample",
  "Led end-to-end development of a content management tool using React for the frontend, and C#, Cassandra for backend services and API’s",
  "Leading redesign execution of a user profile service by converting frontend from C# .NET to React and introducing gamification features",
  "Created website CTA feature using Angular for the frontend, and C#, CosmosDB for backend",
  "Assisting conversion of entire frontend from C# .NET to React by creating custom components and pages",
  "Led research strategy by defining research roadmaps, overseeing all research roles, managing user research projects (survey studies and usability tests) and research operations, and optimizing research processes.",
  "Worked with a cross-functional team (product, marketing, content, design, and development) to develop digital tools to aid justice-impacted individuals. Identified and communicated strategic priorities in partner outreach.",
  "Created interview training program",
  "Led seat integrity project (+$2M/year)",
  "Led site performance team (1 second faster TTFB)",
  "Led project to increase Chinese download speeds (4x increase)",
  "Led mobile speed project (87% faster TTI)",
  "Led search refactor (80% faster dev time)",
  "Led cross-team group to define front-end best practices",
  "Developed API Platform strategy and vision",
  "Led full-stack hiring end to end",
  "Led engineering DEI program and set goals",
  "Led API Reliability project (achieved 99.99% uptime)",
];

const preparedDataSet = dataSet.map((x) => fuzzysort.prepare(x));
