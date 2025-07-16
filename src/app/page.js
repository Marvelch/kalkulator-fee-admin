"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  // Add state for nominal, fee, and total for Beli and Jual
  const [nominalBeli, setNominalBeli] = useState("");
  const [nominalJual, setNominalJual] = useState("");
  // Fee rates (as per Stockbit: 0.15% beli, 0.25% jual, example)
  const feeRateBeli = 0.0015; // 0.15%
  const feeRateJual = 0.0025; // 0.25%

  // Calculate fee and total
  const feeBeli = nominalBeli
    ? Math.floor(Number(nominalBeli) * feeRateBeli)
    : 0;
  const totalBeli = nominalBeli ? Number(nominalBeli) + feeBeli : 0;
  const feeJual = nominalJual
    ? Math.floor(Number(nominalJual) * feeRateJual)
    : 0;
  const totalJual = nominalJual ? Number(nominalJual) - feeJual : 0;

  // Hitung kerugian dan persentase kerugian jika jual < beli
  let kerugian = 0;
  let persentaseKerugian = 0;
  let keuntungan = 0;
  let persentaseKeuntungan = 0;
  if (totalJual && totalBeli && totalJual < totalBeli) {
    kerugian = totalBeli - totalJual;
    persentaseKerugian = (kerugian / totalBeli) * 100;
  }
  // Hitung keuntungan dan persentase keuntungan jika jual > beli
  if (totalJual && totalBeli && totalJual > totalBeli) {
    keuntungan = totalJual - totalBeli;
    persentaseKeuntungan = (keuntungan / totalBeli) * 100;
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/stockbit.png"
          alt="Next.js logo"
          width={180}
          height={37}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Memberikan perhitungan total fee yang ditanggung oleh trader.
          </li>
          <li className="tracking-[-.01em]">
            Perhitungan fee mengacu pada ketentuan fee yang berlaku di Stockbit,
            dengan referensi dari{" "}
            <a href="https://help.stockbit.com/id/article/berapa-biaya-trading-di-stockbit-sekuritas-1lbkyq9/">
              help.stockbit.com
            </a>
          </li>
        </ol>

        <table
          className="table-fixed w-full max-w-md border border-gray-300 rounded-t-xl rounded-b-xl shadow-sm"
          style={{
            borderCollapse: "collapse",
            marginTop: "16px",
            backgroundColor: "transparent", // set transparent background
            color: "white", // ensure font color is white
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
            borderBottomLeftRadius: "16px",
            borderBottomRightRadius: "16px",
            overflow: "hidden",
          }}
        >
          <colgroup>
            <col style={{ width: "80px" }} />
            <col style={{ width: "220px" }} /> {/* Perbesar kolom nominal */}
            <col style={{ width: "110px" }} />
            <col style={{ width: "110px" }} />
          </colgroup>
          <thead>
            <tr className="bg-transparent">
              <th className="px-3 py-2 text-left font-semibold border-b border-gray-100"></th>
              <th className="px-3 py-2 text-left font-semibold border-b border-gray-300">
                Nominal
              </th>
              <th className="px-3 py-2 text-left font-semibold border-b border-gray-300">
                Fee
              </th>
              <th className="px-3 py-2 text-left font-semibold border-b border-gray-300">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-2 border-b border-gray-200">Beli</td>
              <td className="px-3 py-2 border-b border-gray-200">
                <input
                  name="nominal-beli"
                  type="text"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    width: "200px", // Perbesar input nominal
                  }}
                  className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={
                    nominalBeli ? Number(nominalBeli).toLocaleString() : ""
                  }
                  onChange={(e) => {
                    // Only allow numbers, remove commas
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setNominalBeli(val);
                  }}
                  placeholder="0"
                  inputMode="numeric"
                />
              </td>
              <td className="px-3 py-2 border-b border-gray-200 text-center">
                {feeBeli.toLocaleString()}{" "}
                <span className="text-xs text-gray-500">(0.15%)</span>
              </td>
              <td className="px-3 py-2 border-b border-gray-200 text-center">
                {totalBeli ? totalBeli.toLocaleString() : ""}
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2">Jual</td>
              <td className="px-3 py-2">
                <input
                  name="nominal-jual"
                  type="text"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    width: "200px", // Perbesar input nominal
                  }}
                  className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={
                    nominalJual ? Number(nominalJual).toLocaleString() : ""
                  }
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setNominalJual(val);
                  }}
                  placeholder="0"
                  inputMode="numeric"
                />
              </td>
              <td className="px-3 py-2 text-center">
                {feeJual.toLocaleString()}{" "}
                <span className="text-xs text-gray-500">(0.25%)</span>
              </td>
              <td className="px-3 py-2 text-center">
                {totalJual ? totalJual.toLocaleString() : ""}
              </td>
            </tr>
          </tbody>
        </table>
        {/* Grand Total */}
        <div className="w-full max-w-md mt-2">
          {nominalJual ? (
            <div
              className="flex justify-between items-center px-4 py-3 bg-gray-800 rounded-b-xl border border-t-0 border-gray-300 text-white font-semibold"
              style={{
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: "16px",
                borderBottomRightRadius: "16px",
              }}
            >
              <span>Grand Total</span>
              <span>{(totalJual - totalBeli).toLocaleString()}</span>
            </div>
          ) : (
            // Jika nominalJual kosong, Grand Total tidak ditampilkan atau kosong
            <div
              className="flex justify-between items-center px-4 py-3 bg-gray-800 rounded-b-xl border border-t-0 border-gray-300 text-white font-semibold"
              style={{
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: "16px",
                borderBottomRightRadius: "16px",
              }}
            >
              <span>Grand Total</span>
              <span></span>
            </div>
          )}
          {/* Tampilkan kerugian jika ada */}
          {kerugian > 0 && (
            <div className="flex flex-col gap-1 bg-red-100 text-red-800 rounded-b-xl px-4 py-3 mt-2 border border-t-0 border-red-300">
              <span>
                Kerugian: <b>{kerugian.toLocaleString()}</b>
              </span>
              <span>
                Persentase Kerugian: <b>{persentaseKerugian.toFixed(2)}%</b>
              </span>
            </div>
          )}
          {/* Tampilkan keuntungan jika ada */}
          {keuntungan > 0 && (
            <div className="flex flex-col gap-1 bg-green-100 text-green-800 rounded-b-xl px-4 py-3 mt-2 border border-t-0 border-green-300">
              <span>
                Keuntungan: <b>{keuntungan.toLocaleString()}</b>
              </span>
              <span>
                Persentase Keuntungan: <b>{persentaseKeuntungan.toFixed(2)}%</b>
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Image
            src="/qr.jpeg"
            alt="Vercel logomark"
            width={150}
            height={150}
          />
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-auto"
            href="https://stream.trakteer.id/qr-code.html?qr_pattern=rounded&creator=topantopan&timestamp=1752709002"
            target="_blank"
            rel="noopener noreferrer"
          >
            🎁 Traktir Developer
          </a>
        </div>
      </main>

      <style jsx global>{`
        input::placeholder {
          color: black !important;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
