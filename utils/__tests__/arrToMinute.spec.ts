import arrToMinute from "../arrToMinute";

describe("arrToMinute", () => {
  it("should convert an array of [hour, minute] to minutes", () => {
    // Test case 1
    const input1: [number, number] = [2, 30];
    const expected1 = 150; // 2 hours * 60 + 30 minutes
    expect(arrToMinute(input1)).toEqual(expected1);

    // Test case 2
    const input2: [number, number] = [1, 15];
    const expected2 = 75; // 1 hour * 60 + 15 minutes
    expect(arrToMinute(input2)).toEqual(expected2);

    // Test case 3: Zero values
    const input3: [number, number] = [0, 0];
    const expected3 = 0;
    expect(arrToMinute(input3)).toEqual(expected3);
  });

  it("should return 0 for invalid input", () => {
    // Test case 1: Invalid input
    const input1: [number, number] = [NaN, 30];
    const expected1 = 0;
    expect(arrToMinute(input1)).toEqual(expected1);

    // Test case 2: Negative values
    const input2: [number, number] = [-1, 15];
    const expected2 = 0;
    expect(arrToMinute(input2)).toEqual(expected2);
  });
});
