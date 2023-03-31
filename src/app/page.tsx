import Image from "next/image";

async function getData() {
  const res = await fetch("http://localhost:3000/api/assets");
  const data = await res.json();

  // append more asset details like name and symbol
  // since we don't have a way to get this from the API/contract
  let assets = [];
  if (data.length > 0) {
    assets = data.map((asset: any) => {
      const { denom } = asset;
      if (denom === "uosmo") {
        return { ...asset, name: "Osmosis", symbol: "OSMO", icon: "icon-osmo" };
      } else if (
        denom ===
        "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2"
      ) {
        return {
          ...asset,
          name: "Cosmos Hub",
          symbol: "ATOM",
          icon: "icon-atom",
        };
      } else if (
        denom ===
        "ibc/46B44899322F3CD854D2D46DEEF881958467CDD4B3B10086DA49296BBED94BED"
      ) {
        return { ...asset, name: "Juno", symbol: "JUNO", icon: "icon-juno" };
      }
    });
  }
  return assets;
}

export default async function Home() {
  const data = await getData();

  // table headers
  const headers = ["", "Asset", "Borrow rate", "Deposit Cap", , ""];

  return (
    <div
      className="w-full min-h-screen h-full flex items-start justify-center px-3 md:px-24 pb-20"
      style={{
        backgroundImage: "url('/icon-bg.svg')",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#562a3b",
      }}
    >
      <div className="w-full min-w-3xl h-full flex flex-col items-center justify-start pt-10 space-y-6">
        <Image src="/icon-mars.svg" width={200} height={200} alt="mars" />
        <h1 className="text-5xl font-semibold tracking-widest text-center">
          WELCOME TO THE RED BANK
        </h1>
        <h2 className="text-2xl font-light tracking-widest text-center">
          LEND AND BORROW MONEY ON THE OSMOSIS BLOCKCHAIN
        </h2>

        <div className="w-full max-w-610 rounded-2xl border-8 border-red-100 bg-gradient-to-br from-red-200 to-red-100 pb-6">
          <h3 className="text-2xl font-light tracking-widest text-center border-b border-gray-border py-6">
            DEPOSITS
          </h3>
          <table className="table-auto w-full ">
            <thead>
              <tr className="text-xs font-thin">
                {headers.map((title, index) => (
                  <th
                    key={index}
                    className="font-light border-b border-gray-border"
                  >
                    <div
                      className={`w-full flex ${
                        index < 2 ? "justify-start" : "justify-end"
                      }`}
                    >
                      <button className="flex items-center justify-center py-6 w-fit">
                        {index > 0 && title && (
                          <Image
                            src="/icon-sort-desc.svg"
                            height={24}
                            width={24}
                            alt="sort"
                          />
                        )}
                        <span className="decoration-dotted underline underline-offset-4 text-gray-border-light">
                          {title}
                        </span>
                        {index === 0 && title && (
                          <Image
                            src="/icon-sort-desc.svg"
                            height={24}
                            width={24}
                            alt="sort"
                          />
                        )}
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((asset: any, index: number) => {
                const { name, symbol, icon, borrow_rate, deposit_cap } = asset;
                return (
                  <tr
                    className={`py-4 border-b border-gray-border `}
                    key={index}
                  >
                    <td>
                      <div className="py-4 px-6 flex text-left w-fit">
                        <Image
                          src={`/coins/${icon}.svg`}
                          height={32}
                          width={32}
                          alt=""
                        />
                      </div>
                    </td>
                    <td>
                      <div className="py-4 text-left">
                        <div>{symbol}</div>
                        <div className="opacity-60">{name}</div>
                      </div>
                    </td>
                    <td>
                      <div className="py-4 text-right">
                        {parseFloat(borrow_rate).toFixed(3)}%
                      </div>
                    </td>
                    <td>
                      <div className="py-4 text-right">
                        {parseFloat(deposit_cap).toLocaleString("en-US")}
                      </div>
                    </td>

                    <td>
                      <div className="py-4 px-6 text-right">
                        <button>
                          <Image
                            src="/icon-carat.svg"
                            height={12}
                            width={12}
                            alt="carat"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
