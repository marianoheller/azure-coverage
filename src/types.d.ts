// ========================================
// Definition
interface IDefinitionOptions {
  organization: string | undefined;
  project: string | undefined;
}

interface IDefinitionReport {
  count: number;
  value: Array<IDefinition>;
}

interface IDefinition {
  id: number;
  name: string;
}

// ========================================
// Build
interface IBuildOptions {
  organization: string | undefined;
  project: string | undefined;
  definitions: Array<number>
}

interface IBuildReport {
  count: number;
  value: Array<IDefinition>;
}

interface IBuild {
  id: number;
}


// ========================================
// Coverage
interface ICoverageOptions {
  organization: string | undefined;
  project: string | undefined;
  buildId: number;
}

interface ICoverageReport {
  coverageData: Array<IConverageData>;
}

interface IConverageData {
  coverageStats: Array<ICoverageStats>;
  buildPlatform: string;
  buildFlavor: string;
}

interface ICoverageStats {
  label: string;
  covered: number;
  total: number;
}
