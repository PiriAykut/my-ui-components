import React from "react";
import styles from "./MyContainer.module.css";

function MyContainer({
    children,
    title = "",
    description = null,
    icon = null,
    className = null,
    titleTextStyle = null,
    style = null,
    headerClassName = null,
    headerStyle = null,
    bodyClassName = null,
    bodyStyle = null,
    footerClassName = null,
    footerStyle = null,
}) {
    const arrChild = React.Children.toArray(children);

    let childHeaderRight = null;
    let childBody = null;
    let childFooter = null;

    for (let i = 0; i < arrChild.length; i++) {
        const el = arrChild[i];
        if (el.type && el.type.toString().includes("MyContainerTagRight")) {
            childHeaderRight = el;
        } else if (
            el.type &&
            el.type.toString().includes("MyContainerTagBody")
        ) {
            childBody = el;
        } else if (
            el.type &&
            el.type.toString().includes("MyContainerTagFooter")
        ) {
            childFooter = el;
        } else if (childBody == null) {
            childBody = el;
        } else if (
            childBody != null &&
            childFooter == null &&
            i == arrChild.length - 1
        ) {
            childFooter = el;
        }
    }

    return (
        <section
            className={`${styles.container} ${className || ""}`}
            style={style}
        >
            {(title || childHeaderRight) && (
                <div className={`${styles.header} ${headerClassName || ""}`} style={headerStyle}>
                {title &&
                    <>
                        <h3 className={styles.title} style={titleTextStyle}>
                            {title}
                        </h3>
                        {description && (
                            <span className={styles.description}>
                                {description}
                            </span>
                        )}
                    </>
                }
                    {childHeaderRight && childHeaderRight}
                </div>
            )}
            <div
                className={`${styles.body} ${bodyClassName || ""}`}
                style={(title ? { paddingTop: "12px" } : null)}
            >
                {childBody}
            </div>
            {childFooter && (
                <div
                    className={`${styles.footer} ${footerClassName || ""}`}
                    style={(title ? { paddingTop: "12px" } : null) }
                >
                    {childFooter}
                </div>
            )}
        </section>
    );
}

export default MyContainer;
