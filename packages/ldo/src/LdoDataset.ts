import type { Quad } from "@rdfjs/types";
import jsonldDatasetProxy from "@ldo/jsonld-dataset-proxy";
import { WrapperSubscribableDataset } from "@ldo/subscribable-dataset";
import { LdoBuilder } from "./LdoBuilder";
import type { ShapeType } from "./ShapeType";
import type { LdoBase } from "./index";

/**
 * @category Getting an LdoDataset
 *
 * An LdoDataset is a utility for building a linked data object.
 *
 * It is not recommended to instantiate an LdoDataset. Instead use the {@link createLdoDataset} function.
 *
 * @example
 * ```typescript
 * import { LdoDataset, createLdoDatasetFactory } from "@ldo/ldo";
 * import { FoafProfileShapeType } from "./.ldo/foafProfile.shapeTypes";
 *
 * const ldoDatasetFactory = createLdoDatasetFactory();
 * const ldoDataset = new LdoDataset();
 * const ldoBuilder = ldoDataset.usingType(FoafProfileShapeType);
 * ```
 */
export class LdoDataset extends WrapperSubscribableDataset<Quad> {
  /**
   * Creates an LdoBuilder for a given shapeType
   *
   * @param shapeType - A ShapeType
   * @returns A builder for the given type
   */
  public usingType<Type extends LdoBase>(
    shapeType: ShapeType<Type>,
  ): LdoBuilder<Type> {
    const proxyBuilder = jsonldDatasetProxy(this, shapeType.context);
    return new LdoBuilder(proxyBuilder, shapeType);
  }
}
