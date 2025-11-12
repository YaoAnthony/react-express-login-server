

/**
 * send code to server prompt
 */
const sendCodeToPrompt = (code) => {

    const prompt = `
    You are a code generator. Based on the following function and its details, generate an appropriate test case.
    
    Write a Python test case for the following function to ensure maximum coverage, including edge cases, typical cases, and invalid inputs. 
    Use a Python testing framework like unittest to structure the test. 
    Include necessary imports for the unittest framework, 
    but do not include imports for the function being tested, and orginal code. 

    for example:
    when I try to test xxx function, do not include "from your_module import xxx"

    and do not include \`\`\`  python \`\`\`
    
    Only output the test code without explanations.

    Your answer should be like that:

    #import function
    import unittest

    #test class
    ...

    #enter function
    if __name__ == '__main__':
        unittest.main()

    Code:

    \`\`\`
    ${code}
    \`\`\`

    `;

    return prompt;

}


module.exports = {
    sendCodeToPrompt,
};