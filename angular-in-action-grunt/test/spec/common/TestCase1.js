/**
 * Created by vizewang on 2015/10/17.
 */
describe("A suite",function(){
  it("contains spec with an expectation",function(){
    console.log("This is msg from log...");
    expect(true).toBe(true);
  });
});

describe("A suite of basic functions",function(){
  if("reverse word",function(){
      expect("DCBA").toEqual(reverse("ABCD"));
      expect("damo").toEqual(reverse("omad"));
    });
});
