#!/usr/bin/env tsx

import { shouldRunSeeds } from "./config";

if (shouldRunSeeds()) {
  console.log("🌱 Executando seeds do Cora.Deep...");
  import("./seeds");
} else {
  console.log("🚫 Seeds desabilitados para ambiente de produção");
}
