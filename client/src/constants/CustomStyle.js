import AppColors from "./AppColors";

export const CustomStyle = {
    inputStyle: {
        padding: "3px",
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: AppColors.grey,
            },
            "&:hover fieldset": {
                borderColor: AppColors.primary,
            },
            "&.Mui-focused fieldset": {
                borderColor: AppColors.primary,
            },
        },
    }
}