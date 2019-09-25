import R from "ramda";
import agent from "./agent";

const BASE_CONFIG = {
  organization: process.env.ORGANIZATION,
  project: process.env.PROJECT
};

export const parseDefinitions: (data: IDefinitionReport) => Array<IDefinition> = R.compose(
  R.map((def: IDefinition) => ({
    id: def.id,
    name: def.name
  })),
  R.prop("value")
);

export default () =>
  agent
    .fetchDefinitions(BASE_CONFIG)
    .then(parseDefinitions)
