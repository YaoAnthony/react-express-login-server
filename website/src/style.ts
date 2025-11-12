
const colors = {
    text: {
        primary: "text-white-text-primary dark:text-dark-text-primary",
        secondary: "text-white-text-secondary dark:text-dark-text-secondary",
        hoverPrimary: "hover:text-white-text-primary dark:hover:text-dark-text-primary",
        hoverSecondary: "hover:text-white-text-primary dark:hover:text-dark-text-primary",
        selectSecondary: "text-white-text-secondary dark:text-dark-text-primary",
        selectSecondaryHover: "hover:text-white-text-primary dark:hover:text-dark-text-primary",

        code: "text-white-text-primary dark:text-[#268bff]",
        code_string: "text-white-text-primary dark:text-code-string",
        code_number: "text-white-text-primary dark:text-code-number",
        code_keyword: "text-white-text-primary dark:text-code-keyword",
        code_comment: "text-white-text-primary dark:text-code-comment",
        code_function: "text-white-text-primary dark:text-code-function",
        code_operator: "text-white-text-primary dark:text-code-operator",
        code_default: "text-white-text-primary dark:text-code-default",

        highlight_purpleBlue: "bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400"
    },
    bg: {
        primary: "bg-white-background dark:bg-dark-background",
        secondary: "bg-white-background-secondary dark:bg-dark-background-secondary",
        tertiary: "bg-white-background-tertiary dark:bg-dark-background-tertiary",
        purpleBlue: "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/40 dark:to-purple-900/40",

        // githubScan页面的颜色
        githubScan_primary:"bg-white-background dark:bg-githubScan-dark-primary", //editor bg color
        githubScan_secondary:"bg-white-background dark:bg-githubScan-dark-secondary", //file explorer

        selectPrimary: "bg-white-text-primary dark:bg-dark-text-primary",
        
        codePrimary: "white-code-background-primary dark:dark-code-background-primary",
        codeSecondary: "white-code-background-secondary dark:dark-code-background-secondary",
        

        transparent: "bg-transparent",
        blurredScroll: "backdrop-blur-md bg-white/50 dark:bg-black/50 shadow-lg",
        glassmorphism: "bg-white/30 dark:bg-black/30",
        white30: "bg-[rgba(255,255,255,0.6)] dark:bg-[rgba(255,255,255,0.1)]",
        auth: "bg-background-secondary dark:bg-dark-login-background",
        

    },
    button: {
        primary: `
            bg-white-background text-white-text-primary border border-white-text-primary
            dark:bg-dark-background dark:text-dark-text-primary dark:border-dark-text-primary
        `,
        primaryHover: `
            hover:bg-white-text-primary hover:text-dark-text-primary
            dark:hover:bg-dark-text-primary dark:hover:text-white-text-primary
        `
        
    },
    border: {
        whiteGlass: "border-[rgba(255,255,255,0.4)]",
        //删除了border，因为他直接定义整个边框，假如我需要border-b那么我就只能自己手动定义颜色就用不了这个了
        soft: "border-white/30 dark:border-white/20",
    },
    shadow: {
        glow: "shadow-glow",
        glass: "shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]",
    },
};

const styles = {
    paddingX: "3xl:px-72 2xl:px-64 xl:px-28 lg:px-16 md:px-10 xs:px-5",
  
};
const mainPageStyle = {
    primaryColor: 'text-white-text-primary dark:text-dark-text-primary',
    secondaryColor: `text-white-text-secondary dark:text-gray-500 `,
    background : ' rounded-3xl bg-[rgba(255,255,255,0.6)] dark:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.4)] backdrop-blur-lg shadow-glow'
}
  
export { colors,styles,mainPageStyle };