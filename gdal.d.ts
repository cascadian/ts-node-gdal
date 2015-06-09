// Type definitions for gdal 0.4.x
// Project: https://github.com/naturalatlas/node-gdal
// Definitions by: cascadian <https://github.com/cascadian/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path='../node/node.d.ts'/>

declare module Gdal {

    type options = Object |string[];

    export interface Bounds {
        minX: number;
        maxX: number;
        minY: number;
        maxY: number;
    }

    export interface Bounds3D extends Bounds {
        minZ: number;
        maxZ: number;
    }

    export class Point extends Geometry {
        constructor(x: number, y: number, z?: number);
        x: number;
        y: number;
        z: number;
    }

    export class Geometry {
        /**
        * Computes boundary
        */
        boundary(): Geometry;
        /**
        * Buffers the geometry by the given distance.
        */
        buffer(distance: number, segments: number): Geometry;

        /**
        * Compute the centroid of the geometry
        */
        centroid(): Point;

        clone(): Geometry;

        /**
        * Closes any un-closed rings.
        */
        closeRings();

        /**
        * Determines if the current geometry contains the provided geometry.
        * @param geometry
        */
        contains(geometry: Geometry): boolean;

        convexHull(): Geometry;

        crosses(geometry: Geometry): boolean;

        difference(geometry: Geometry): Geometry;

        disjoint(geometry: Geometry): boolean;

        distance(geometry: Geometry): Geometry;

        empty();

        equals(geometry: Geometry): boolean;

        getEnvelope(): Envelope;

        getEnvelope3D(): Envelope3D;

        intersection(geometry: Geometry): Geometry;

        intersects(geometry: Geometry): boolean;

        isEmpty(): boolean;

        isRing(): boolean;

        isSimple(): boolean;

        isValid(): boolean;

        overlaps(geometry: Geometry): boolean;

        /**
         * Modify the geometry such that it has no segment longer than the given distance.
         */
        segmentize(segment_length: number): number;

        /**
         * Reduces the geometry complexity.
         */
        simplify(tolerance: number): Geometry;

        /**
         * Reduces the geometry complexity while preserving the topology.
         */
        simplifyPreserveTopology(tolerance: number): Geometry;

        swapXY();

        /**
         * Computes the symmetric difference of this geometry and the second geometry.
         */
        symDifference(geometry: Geometry): Geometry;

        toGML(): Geometry;

        toJSON(): Geometry;

        toKML(): Geometry;

        toObject(): Object;

        touches(geometry: Geometry): boolean;

        toWKB(byte_order?: string, variant?: string): Geometry;

        toWKT(): string;

        transform(transformation: CoordinateTransformation);

        transformTo(srs: SpatialReference);

        union(geometry: Geometry): Geometry;

        within(geometry: Geometry): Geometry;

        coordinateDimension: number;

        dimension: number;

        name: string;

        srs: SpatialReference;

        wkbXize: number;
        wkbType: number;

        static create(type: number): Geometry;
        static fromWKB(wkb: Buffer, srs?: SpatialReference): Geometry;
        static fromWKT(wkt: string, srs?: SpatialReference): Geometry;


    }

    export class CoordinateTransformation {
        constructor(source: SpatialReference, target: SpatialReference|Dataset);
        transformPoint(x: number, y: number, z?: number): {x: number; y: number; z: number;};
    }

    export class Polygon extends Geometry {
        constructor();
        boundary(): Geometry;
    }

    /**
    * A 3D bounding box
    */
    export class Envelope3D {
        constructor(bounds: Bounds3D);
        contains(envelope: Envelope3D): boolean;
        intersect(envelope: Envelope3D): void;
        intersects(envelope: Envelope3D): boolean;
        isEmpty(): boolean;
        merge(envelope: Envelope3D): void;

    }

    export class Envelope {
        constructor(bounds?: Bounds);
        contains(envelope: Envelope): boolean;
        intersect(envelope: Envelope): void;
        intersects(envelope: Envelope): boolean;
        isEmpty(): boolean;
        merge(envelope: Envelope): void;
        toPolygon(): Polygon;

    }

    export interface Layer {
        /**
        * Flush pending changes to disk.
        */
        flush();

        /**
        * Fetch the extent of this layer.
        * @param force Defaults to true
        * @return Bounding envelope
        */
        getExtent(force?: boolean): Envelope;
    }

    export interface Units{
        value;
        unit;
    }

    export class SpatialReference {
        constructor(wkt?: string);
        autoIdentifyEPSG();
        clone(): SpatialReference;
        cloneGeogCS(): SpatialReference;
        EPSGTreatsAsLatLong(): boolean;
        EPSGTreatsAsNorthingEasting(): boolean;
        getAngularUnits(): Units;
        getAttrValue(node_name: string, attr_index?: number): string;
        getAuthorityCode(target_key: string): string;
        getAuthorityName(target_key: string): string;
        getLinearUnits(): Units;
        isCompound(): boolean;
        isGeocentric(): boolean;
        isLocal(): boolean;
        isProjected(): boolean;
        isSame(srs: SpatialReference): boolean;
        isSameVertCS(srs: SpatialReference): boolean;
        isVertical(): boolean;
        morphFromESRI();
        morphToESRI();
        setWellKnownGeogCS(name: string);
        toPrettyWKT(simplify?: boolean): string;
        toProj4(): string;
        toWKT(): string;
        toXML(): string;
        validate(): string;

        static fromCRSURL(input: string): SpatialReference;
        static fromEPSG(input: number): SpatialReference;
        static fromEPSGA(input: number): SpatialReference;
        static fromESRI(input: string[]): SpatialReference;
        static fromMICoordSys(input: string): SpatialReference;
        static fromProj4(input: string): SpatialReference;
        static fromURL(url: string): SpatialReference;
        static fromURN(input: string): SpatialReference;
        static fromUserInput(input: string): SpatialReference;
        static fromWKT(wkt: string): SpatialReference;
        static fromWMSAUTO(input: string): SpatialReference;
        static fromXML(input: string): SpatialReference;

    }

    export interface DatasetLayers {
        count(): number;
        get(key: string|number): Layer;
        forEach(iterator: (layer: Layer) => void);
        remove(index: number);
        copy(src_lyr: Layer, dst_lyr_name: string, options?: options): Layer;
        create(name: string, srs: SpatialReference, geomType: number|Function, creationOptions: options): Layer;
    }

    export interface Dataset {
        layers: DatasetLayers;
    }

    export function open(path: string,
        mode?: string,
        drivers?: string[],
        x_size?: number,
        y_size?: number,
        band_count?: number,
        data_type?: number,
        creation_options?: options): Dataset;


    export var wkb25DBit: number;
    export var wkbGeometryCollection: number;
    export var wkbGeometryCollection25D: number;
    export var wkbLinearRing: number;
    export var wkbLinearRing25D: number;
    export var wkbLineString: number;
    export var wkbLineString25D: number;
    export var wkbMultiLineString: number;
    export var wkbMultiLineString25D: number;
    export var wkbMultiPoint: number;
    export var wkbMultiPoint25D: number;
    export var wkbMultiPolygon: number;
    export var wkbMultiPolygon25D: number;
    export var wkbNone: number;
    export var wkbPoint: number;
    export var wkbPoint25D: number;
    export var wkbPolygon: number;
    export var wkbPolygon25D: number;
    export var wkbUnknown: number;


}

declare module 'gdal'{
  var g: typeof Gdal;
  export = g;
}
