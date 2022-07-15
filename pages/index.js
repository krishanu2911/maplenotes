import Head from "next/head";
import { Sidebar } from "../components/Sidebar";
import { NoteSection } from "../components/NoteSection";
export default function Home() {
  return (
    <div>
        <NoteSection />
    </div>
  );
}
