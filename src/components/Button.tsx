import "../css/Button.css";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    variant?: "primary" | "secondary" | "ghost" | "danger" | "dark";
    size?: "sm" | "md" | "lg";
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
    loading?: boolean;
    marginx?: number;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function CButton({
    label = "Button",
    variant = "primary",
    size = "md",
    leftIcon,
    rightIcon,
    fullWidth = false,
    loading = false,
    disabled,
    onClick,
    type = "button",
    ...rest
}: ButtonProps) {
    const classes = [
        "btn",
        `btn-${variant}`,
        `btn-${size}`,
        fullWidth ? "btn-full" : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            type={type}
            className={classes}
            disabled={disabled || loading}
            onClick={onClick}
            {...rest}
        >
            {loading ? (
                <span className="btn-spinner" />
            ) : (
                leftIcon && <span className="btn-icon">{leftIcon}</span>
            )}
            {label}
            {!loading && rightIcon && <span className="btn-icon">{rightIcon}</span>}
        </button>
    );
}