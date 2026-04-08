"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Search, Filter, ShoppingBag, Plus, Minus, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function MarketplacePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  
  const supabase = createClient();

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from('products').select('*');
      if (data) setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 p-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Health Marketplace</h1>
          <p className="text-muted-foreground mt-1">Curated medical supplies and supplements for your health journey.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="pl-10" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary">
                {cartCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          [1, 2, 3, 4].map(i => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-muted rounded-t-xl" />
              <CardContent className="p-4 space-y-3">
                <div className="h-4 bg-muted w-3/4 rounded" />
                <div className="h-3 bg-muted w-1/2 rounded" />
              </CardContent>
            </Card>
          ))
        ) : filteredProducts.map((product) => (
          <Card key={product.id} className="group overflow-hidden border-primary/5 hover:border-primary/20 transition-all hover:shadow-lg flex flex-col">
            <div className="relative h-48 bg-muted overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                {/* Fallback pattern for now since we have one main image asset */}
                <div className="flex items-center justify-center h-full bg-slate-50 text-slate-200">
                    <ShoppingBag className="h-16 w-16" />
                </div>
                <Badge className="absolute top-3 right-3 bg-white/90 text-primary hover:bg-white backdrop-blur-sm border-none">
                    {product.category}
                </Badge>
            </div>
            <CardHeader className="p-4 pb-0">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors leading-tight">
                  {product.name}
                </CardTitle>
                <span className="text-lg font-bold text-primary">${product.price}</span>
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-1">
              <p className="text-xs text-muted-foreground line-clamp-2">
                {product.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                <CheckCircle2 className="h-3 w-3" />
                {product.stock_quantity > 0 ? "In Stock" : "Backorder"}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button onClick={addToCart} className="w-full gap-2 rounded-xl group-hover:bg-primary transition-colors">
                <Plus className="h-4 w-4" /> Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-20 border-2 border-dashed rounded-2xl bg-muted/30">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
          <h3 className="text-xl font-semibold">No products found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
}
