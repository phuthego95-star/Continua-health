"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, ShieldAlert, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function NavigatorPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your Continua Health Navigator. I can explain your care plans, summarize labs, or help you prepare for your next visit. Please remember I cannot provide medical diagnosis or alter your treatments.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Based on your recent labs (HbA1c 6.5%), your levels are stable. However, as an AI, I cannot give definitive medical advice. Shall I add a note for your upcoming visit with Dr. Smith to discuss these results?"
      }]);
    }, 1000);
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold tracking-tight">AI Health Navigator</h2>
        <p className="text-muted-foreground mt-2 flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-amber-500" />
          Always consult your clinician for medical advice.
        </p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="p-4 border-t bg-card">
          <form onSubmit={handleSend} className="flex w-full gap-2">
            <Input 
              placeholder="Ask about your labs, care plan, or next visit..." 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
