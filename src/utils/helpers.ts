export const objectParser = async (existing,allFields) => {
    const testR = {};
    allFields.forEach((i) => {

      if (existing[i]) {
        testR[i] = existing[i];
      } else {
        testR[i] = '';
      }
    });

    // console.log(testR);
    return testR
}


export const  getTestFields =async(model) =>{
    return Object.keys(model.schema.paths);
  }