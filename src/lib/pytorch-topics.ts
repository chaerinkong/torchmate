// Curated PyTorch topics with official documentation references.
// These are included in the LLM prompt to ground question generation
// in real PyTorch concepts and link to authoritative sources.

export interface PyTorchTopic {
  category: string;
  topics: {
    name: string;
    docUrl: string;
    description: string;
  }[];
}

export const PYTORCH_TOPICS: PyTorchTopic[] = [
  {
    category: "CUDA & GPU Programming",
    topics: [
      {
        name: "CUDA Streams",
        docUrl: "https://pytorch.org/docs/stable/notes/cuda.html#cuda-streams",
        description: "Asynchronous execution, stream synchronization, non-default streams",
      },
      {
        name: "CUDA Memory Management",
        docUrl: "https://pytorch.org/docs/stable/notes/cuda.html#memory-management",
        description: "Caching allocator, memory pinning, torch.cuda.empty_cache()",
      },
      {
        name: "Multi-GPU with DataParallel",
        docUrl: "https://pytorch.org/docs/stable/generated/torch.nn.DataParallel.html",
        description: "DataParallel vs DistributedDataParallel, device placement",
      },
      {
        name: "Mixed Precision Training",
        docUrl: "https://pytorch.org/docs/stable/amp.html",
        description: "torch.amp, autocast, GradScaler, float16/bfloat16",
      },
    ],
  },
  {
    category: "Autograd & Differentiation",
    topics: [
      {
        name: "Autograd Mechanics",
        docUrl: "https://pytorch.org/docs/stable/notes/autograd.html",
        description: "Computational graph, retain_graph, grad_fn, leaf tensors",
      },
      {
        name: "Custom Autograd Functions",
        docUrl: "https://pytorch.org/docs/stable/autograd.html#function",
        description: "torch.autograd.Function, forward/backward ctx, double backward",
      },
      {
        name: "Gradient Checkpointing",
        docUrl: "https://pytorch.org/docs/stable/checkpoint.html",
        description: "Memory-compute tradeoff, torch.utils.checkpoint",
      },
      {
        name: "Higher-Order Gradients",
        docUrl: "https://pytorch.org/docs/stable/autograd.html",
        description: "create_graph=True, computing Hessians, jacobians",
      },
    ],
  },
  {
    category: "Distributed Training",
    topics: [
      {
        name: "DistributedDataParallel",
        docUrl: "https://pytorch.org/docs/stable/notes/ddp.html",
        description: "Process groups, gradient bucketing, DDP internals",
      },
      {
        name: "RPC Framework",
        docUrl: "https://pytorch.org/docs/stable/rpc.html",
        description: "torch.distributed.rpc, RRef, distributed autograd",
      },
      {
        name: "FSDP (Fully Sharded Data Parallel)",
        docUrl: "https://pytorch.org/docs/stable/fsdp.html",
        description: "Parameter sharding, mixed precision with FSDP, wrapping policies",
      },
      {
        name: "Collective Communication",
        docUrl: "https://pytorch.org/docs/stable/distributed.html",
        description: "all_reduce, broadcast, scatter, gather, backends (NCCL, Gloo)",
      },
    ],
  },
  {
    category: "torch.compile & Performance",
    topics: [
      {
        name: "torch.compile",
        docUrl: "https://pytorch.org/docs/stable/torch.compiler.html",
        description: "Dynamo, graph breaks, modes (reduce-overhead, max-autotune)",
      },
      {
        name: "TorchScript",
        docUrl: "https://pytorch.org/docs/stable/jit.html",
        description: "torch.jit.script, torch.jit.trace, serialization, limitations",
      },
      {
        name: "Profiling with torch.profiler",
        docUrl: "https://pytorch.org/docs/stable/profiler.html",
        description: "CPU/GPU profiling, trace export, TensorBoard integration",
      },
      {
        name: "Memory Format (Channels Last)",
        docUrl: "https://pytorch.org/docs/stable/tensor_attributes.html#torch-memory-format",
        description: "NHWC layout, to(memory_format=), performance implications",
      },
    ],
  },
  {
    category: "Data Loading & Processing",
    topics: [
      {
        name: "DataLoader Internals",
        docUrl: "https://pytorch.org/docs/stable/data.html",
        description: "num_workers, pin_memory, prefetch_factor, collate_fn, samplers",
      },
      {
        name: "Custom Datasets",
        docUrl: "https://pytorch.org/docs/stable/data.html#torch.utils.data.Dataset",
        description: "Map-style vs iterable-style, IterableDataset, worker init",
      },
      {
        name: "Data Transforms",
        docUrl: "https://pytorch.org/vision/stable/transforms.html",
        description: "torchvision.transforms.v2, functional transforms, custom transforms",
      },
    ],
  },
  {
    category: "Model Architecture & Modules",
    topics: [
      {
        name: "nn.Module Internals",
        docUrl: "https://pytorch.org/docs/stable/notes/modules.html",
        description: "Hooks, register_buffer, register_parameter, module traversal",
      },
      {
        name: "Parameter Initialization",
        docUrl: "https://pytorch.org/docs/stable/nn.init.html",
        description: "Xavier, Kaiming, orthogonal init, lazy modules",
      },
      {
        name: "Custom Layers",
        docUrl: "https://pytorch.org/docs/stable/notes/extending.html",
        description: "Extending nn.Module, stateful layers, parametrize",
      },
      {
        name: "Hooks System",
        docUrl: "https://pytorch.org/docs/stable/generated/torch.nn.Module.html#torch.nn.Module.register_forward_hook",
        description: "Forward hooks, backward hooks, full backward hooks, global hooks",
      },
    ],
  },
  {
    category: "Serialization & Deployment",
    topics: [
      {
        name: "Model Saving & Loading",
        docUrl: "https://pytorch.org/docs/stable/notes/serialization.html",
        description: "state_dict, torch.save, safe serialization, weights_only",
      },
      {
        name: "ONNX Export",
        docUrl: "https://pytorch.org/docs/stable/onnx.html",
        description: "torch.onnx.export, dynamic axes, opset version, custom ops",
      },
      {
        name: "Quantization",
        docUrl: "https://pytorch.org/docs/stable/quantization.html",
        description: "Post-training quantization, QAT, dynamic vs static, fx graph mode",
      },
    ],
  },
  {
    category: "Tensor Operations & Internals",
    topics: [
      {
        name: "Tensor Views & Contiguity",
        docUrl: "https://pytorch.org/docs/stable/tensor_view.html",
        description: "View vs clone, stride, contiguous(), reshape vs view",
      },
      {
        name: "Broadcasting Semantics",
        docUrl: "https://pytorch.org/docs/stable/notes/broadcasting.html",
        description: "Broadcasting rules, expand vs repeat, in-place broadcasting",
      },
      {
        name: "Sparse Tensors",
        docUrl: "https://pytorch.org/docs/stable/sparse.html",
        description: "COO, CSR, BSR formats, sparse operations, hybrid sparse",
      },
      {
        name: "Complex Tensors",
        docUrl: "https://pytorch.org/docs/stable/complex_numbers.html",
        description: "Complex dtype, view_as_real, FFT operations",
      },
    ],
  },
];

export function getRandomTopicWithDoc(): { name: string; docUrl: string; description: string; category: string } {
  const category = PYTORCH_TOPICS[Math.floor(Math.random() * PYTORCH_TOPICS.length)];
  const topic = category.topics[Math.floor(Math.random() * category.topics.length)];
  return { ...topic, category: category.category };
}
