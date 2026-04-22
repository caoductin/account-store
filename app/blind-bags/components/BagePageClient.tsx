"use client"
import AuthModal from "@/app/modal/AuthModel";
import { useState } from "react";
import FilterBar from "./FilterBar";
import BagList from "./BagList";

export default function BagePageClient() {
      const [showModal, setShowModal] = useState(false);
    
      return (
        <div>
          {showModal && (
            <AuthModal onClose={() => setShowModal(false)} />
          )}
          <div className="max-w-7xl mx-auto px-4 py-8">
            <FilterBar />
            <BagList  onRequireLogin={() => setShowModal(true)}/>
          </div>
        </div>
      );
    }
