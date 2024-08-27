import clsx from "clsx";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";

function Button({
  to,
  href,
  primary = false,
  login = false,
  noWrapper = false,
  outline = false,
  text = false,
  rounded = false,
  disabled = false,
  small = false,
  large = false,
  children,
  className,
  leftIcon,
  rightIcon,
  onClick,
  ...passProps
}) {
  let Comp = "button";

  const props = {
    onClick,
    ...passProps,
  };

  // Remove event listener when btn is disabled
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith("on") && typeof props[key] === "function") {
        delete props[key];
      }
    });
  }

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  const classes = clsx(
    styles.wrapper,
    {
      [styles.primary]: primary,
      [styles.login]: login,
      [styles["no-wrapper"]]: noWrapper,
      [styles.outline]: outline,
      [styles.text]: text,
      [styles.rounded]: rounded,
      [styles.disabled]: disabled,
      [styles.small]: small,
      [styles.large]: large,
    },
    className
  );

  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={clsx(styles.icon)}>{leftIcon}</span>}
      <span className={clsx(styles.title)}>{children}</span>
      {rightIcon && <span className={clsx(styles.icon)}>{rightIcon}</span>}
    </Comp>
  );
}

export default Button;
