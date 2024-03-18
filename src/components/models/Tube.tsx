import {LengthUnit} from "./LengthUnit.tsx";

type Tube = {
    id: string;
    name: string;
    outerDiameter: LengthUnit;
    innerDiameter: LengthUnit;
};

export type { Tube };