import Segmentation_3X from "./Segmentation_3X";
import Segmentation_4X from "./Segmentation_4X";

const Segmentation = {
    generateSegmentation,
    generateToolState
};

export default Segmentation;

/**
 * generateSegmentation - Generates cornerstoneTools brush data, given a stack of
 * imageIds, images and the cornerstoneTools brushData.
 *
 * @param  {object[]} images    An array of the cornerstone image objects.
 * @param  {Object|Object[]} labelmaps3DorBrushData For 4.X: The cornerstone `Labelmap3D` object, or an array of objects.
 *                                                  For 3.X: the BrushData.
 * @param  {number} cornerstoneToolsVersion The cornerstoneTools major version to map against.
 * @returns {Object}
 */
function generateSegmentation(
    images,
    labelmaps3DorBrushData,
    options = { includeSliceSpacing: true },
    cornerstoneToolsVersion = 4
) {
    if (cornerstoneToolsVersion === 4) {
        return Segmentation_4X.generateSegmentation(
            images,
            labelmaps3DorBrushData,
            options
        );
    }

    if (cornerstoneToolsVersion === 3) {
        return Segmentation_3X.generateSegmentation(
            images,
            labelmaps3DorBrushData,
            options
        );
    }

    console.warn(
        `No generateSegmentation adapater for cornerstone version ${cornerstoneToolsVersion}, exiting.`
    );
}

/**
 * generateToolState - Given a set of cornrstoneTools imageIds and a Segmentation buffer,
 * derive cornerstoneTools toolState and brush metadata.
 *
 * @param  {string[]} imageIds    An array of the imageIds.
 * @param  {ArrayBuffer} arrayBuffer The SEG arrayBuffer.
 * @param {*} metadataProvider
 * @returns {Object}  The toolState and an object from which the
 *                    segment metadata can be derived.
 */
function generateToolState(
    imageIds,
    arrayBuffer,
    metadataProvider,
    cornerstoneToolsVersion = 4
) {
    if (cornerstoneToolsVersion === 4) {
        return Segmentation_4X.generateToolState(
            imageIds,
            arrayBuffer,
            metadataProvider
        );
    }

    if (cornerstoneToolsVersion === 3) {
        return Segmentation_3X.generateToolState(
            imageIds,
            arrayBuffer,
            metadataProvider
        );
    }

    console.warn(
        `No generateToolState adapater for cornerstone version ${cornerstoneToolsVersion}, exiting.`
    );
}
