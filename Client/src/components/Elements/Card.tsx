import { ReactNode } from "react";

interface Card {
  title: string;
  children: ReactNode;
  color: string;
  className?: string;
}

const Card = ({ title, children, className, color }: Card) => (
  <div
    style={{ borderColor: color }}
    className={`border-b-4  size-full bg-gray-50 rounded-lg shadow p-4`}>
    <div className="mb-3">
      <div className="flex items-center">
        <div className="flex justify-center items-center">
          <h5 className="text-xl font-bold leading-none text-gray-900 pe-1">
            {title}
          </h5>
        </div>
      </div>
    </div>
    <div className={className}>{children}</div>
  </div>
);

interface Item {
  children: ReactNode;
  label: string;
  color: string;
  className?: string;
}

const Item = ({ children, label, color }: Item) => (
  <div className={`bg-white shadow rounded-lg flex flex-col`}>
    <div className={`gap-3 mb-2 text-center h-full`}>
      <dl className="bg-${color}-50 p-2 rounded-lg flex flex-col items-center justify-center h-full">
        <dt
          style={{
            backgroundColor: color,
            color: "white",
          }}
          className={`size-8 rounded-full text-sm font-medium flex items-center justify-center mb-1`}>
          {children}
        </dt>
        <dd
          style={{
            color,
          }}
          className={`text-sm font-medium`}>
          {label}
        </dd>
      </dl>
    </div>
  </div>
);

Card.item = Item;
export default Card;
