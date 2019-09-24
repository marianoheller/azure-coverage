require("dotenv").config();
import * as azure from "./services/azure";

azure.getCodeCoverage();
