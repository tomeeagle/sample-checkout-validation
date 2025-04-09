// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const error = {
    localizedMessage: 'You cannot checkout with free sample items only',
    target: 'cart'
  };

  const orderSubtotal = parseFloat(input.cart.cost.subtotalAmount.amount);
  const items = input.cart.lines;

  items.forEach((line) => {
    // console.log("LINE", JSON.stringify(line));
    console.log("LINE PRODUCT", JSON.stringify(line.merchandise.product));
    console.log("PRODUCT TYPE", line.merchandise.product.productType?.toLowerCase())
    console.log("PRODUCT PRODUCT TYPE", line.merchandise.product.__typename)
  });

  // Check if ALL items have productType === 'sample'
  const allSampleProducts =
    items.length > 0 &&
    items.every(
      (line) =>
        line.merchandise.product.__typename === 'Product' &&
        line.merchandise.product.productType?.toLowerCase() === 'sample'
    );

  const errors = [];

  if (orderSubtotal === 0 && allSampleProducts) {
    errors.push(error);
  }

  return { errors };
}
