"use client";
import Navbar from '@/components/Navbar'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/button';
import FilterDropdown from '@/components/FilterDropdown';
import BarangLaporan from '@/components/BarangLaporan';
import { Footer } from "@/components/Footer";

export default function Dashboard() {
  const [filterStatus, setFilterStatus] = useState('belum');
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (value: string) => {
    setFilterStatus(value);
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="text-black font-semibold text-3xl mt-16 ml-28">
          Dashboard Pelapor
        </div>
        <div className="mt-4 ml-28 mr-28">
          <Tabs defaultValue="profile">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="barang">Barang</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">Profile Contents</TabsContent>
            <TabsContent value="barang">
              <div className="flex flex-row justify-between mt-14 pb-4 border-b border-gray-300">
                <div className="text-black font-semibold text-2xl">
                  Barang Laporanmu
                </div>
                <div className="text-black font-medium text-lg flex items-center gap-2">
                  <span>Filter&nbsp;by:</span>
                  <FilterDropdown value={filterStatus} onValueChange={handleFilterChange} />
                  <Button variant="default" className="px-4 py-2 rounded-md ml-2">
                    Buat Laporan
                  </Button>
                </div>
              </div>
              <BarangLaporan 
                filterStatus={filterStatus} 
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}