import { useEffect, useRef } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";

// 示例特性列表（你可以换成 props）
const features = [
    "Bug Detection",
    "All IDE Plugins Access",
    "Top 10 CWE detection",
    "Fuzzy Test",
    "Repair Code",
    "Generate issue/pull request",
    "etc..."
];

const FeatureList = () => {
    // useRef 用于存储多个 li 元素的引用
    const featureItemsRef = useRef<(HTMLLIElement | null)[]>([]);

    useEffect(() => {
        featureItemsRef.current.forEach((item, index) => {
        if (item) {
            item.style.opacity = "0";
            item.style.transform = "translateY(20px)";

            setTimeout(() => {
            item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
            }, 100 * index);
        }
        });
  }, []);

    return (
        <div className="p-4">
            <ul className="space-y-7">
                {features.map((text, index) => (
                <li
                    key={index}
                    ref={(el) => {
                    featureItemsRef.current[index] = el;
                    }}
                    className="flex items-center"
                >
                    <CheckCircleOutlined className="text-green-500 mr-2 text-xl" />
                    <span>{text}</span>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default FeatureList;
