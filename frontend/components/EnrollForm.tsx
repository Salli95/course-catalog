"use client";

import { useState, type FormEvent } from "react";
import type { Enrollment } from "@/lib/courses";

const API = process.env.NEXT_PUBLIC_API_URL;

export type EnrollFormProps = {
  courseId: string;
};

type Status = "idle" | "sending" | "done" | "rejected" | "error";

export function EnrollForm({ courseId }: EnrollFormProps) {
  const [studentName, setStudentName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      // Запрос с Content-Type: application/json НЕ является простым.
      // Браузер перед ним обязательно отправляет preflight-запрос OPTIONS.
      const res = await fetch(`${API}/enrollments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId,
          studentName,
        }),
      });

      if (res.status === 422) {
        const errorData = await res.json();
        // В теле ошибки от FastAPI: { detail: [{ loc, msg, type }, ...] }
        const errMsg = errorData.detail?.[0]?.msg || "Некорректные данные";
        setMessage(errMsg);
        setStatus("rejected");
        return;
      }

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const enrollment: Enrollment = await res.json();
      setMessage(`Номер вашей записи: ${enrollment.id}`);
      setStatus("done");
      setStudentName("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-sm flex-col gap-3">
      <label htmlFor="studentName" className="font-medium text-sm text-slate-700">
        Ваше имя:
      </label>
      <input
        id="studentName"
        type="text"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        placeholder="Введите ваше имя (минимум 2 буквы)"
        required
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition cursor-pointer shadow-xs"
      >
        {status === "sending" ? "Отправка..." : "Записаться на курс"}
      </button>

      {status === "done" && (
        <p className="text-sm text-emerald-600 font-medium">Вы успешно записаны! {message}</p>
      )}
      {status === "rejected" && (
        <p className="text-sm text-red-600 font-medium">Сервер отклонил данные: {message}</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600 font-medium">Не удалось отправить заявку</p>
      )}
    </form>
  );
}

export default EnrollForm;

